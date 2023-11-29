using ApiSource.Controllers.Dto;
using ApiSource.Controllers.Dto.Conversion;
using ApiSource.Points;
using ApiSource.Repositories;
using ApiSource.Repositories.Neighbour;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiSource.Controllers {
    [Controller]
    [Route("/points/neighbour")]
    public class InternalPointController : ControllerBase {
        private readonly IInternalDeliveryPointRepository _pointsRepo;
        private readonly IUserRepository _userRepo;
        private IDtoBuilder<InternalDeliveryPoint, DeliveryPointDto> _pointDtoBuilder;
        private IDtoParser<TimeSlot, TimeSlotDto> _slotDtoParser;
        private IDtoParser<Coords, CoordsDto> _coordsDtoParser;

        public InternalPointController(
            IInternalDeliveryPointRepository pointsRepo,
            IUserRepository userRepo,
            IDtoBuilder<InternalDeliveryPoint, DeliveryPointDto> pointDtoBuilder,
            IDtoParser<TimeSlot, TimeSlotDto> slotDtoParser,
            IDtoParser<Coords, CoordsDto> coordsDtoParser) {
            _pointsRepo = pointsRepo;
            _userRepo = userRepo;
            _pointDtoBuilder = pointDtoBuilder;
            _slotDtoParser = slotDtoParser;
            _coordsDtoParser = coordsDtoParser;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPoint(string id) {
            InternalDeliveryPoint? point = await _pointsRepo.GetPoint(id);
            if (point == null) {
                // 404 if there's no point with that ID
                return NotFound();
            }

            // 200 on success
            return Ok(_pointDtoBuilder.BuildDto(point));
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreatePoint([FromBody] NewPointDto newDto) {
            NeighbourUser? loggedInUser = await _userRepo.GetUserByClaims(User);
            if (loggedInUser == null) {
                // 401 if anonymous - can't create a point unless signed in
                return Unauthorized();
            } else if (loggedInUser.Point != null) {
                // 409 if the user already has a point
                return Conflict();
            }

            InternalDeliveryPoint? point = await _pointsRepo.CreatePoint(
                loggedInUser,
                _coordsDtoParser.ParseDto(newDto.Location),
                newDto.Address,
                newDto.Hours.Select(_slotDtoParser.ParseDto).ToList()
            );

            if (point == null) {
                // 400 on error
                return BadRequest();
            }

            // 201 on success
            return CreatedAtAction(
                nameof(GetPoint),
                new Dictionary<string, string> { { "id", point.Id.ToString() } },
                _pointDtoBuilder.BuildDto(point)
            );
        }

        [Authorize]
        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdatePoint(string id, [FromBody] EditPointDto editDto) {
            NeighbourUser? loggedInUser = await _userRepo.GetUserByClaims(User);

            if (loggedInUser == null) {
                // 401 if anonymous - can't edit points unless signed in
                return Unauthorized();
            }

            InternalDeliveryPoint? point = await _pointsRepo.GetPoint(id);
            if (point == null) {
                // 404 if there's no point with that ID
                return NotFound();
            } else if (point.User != loggedInUser) {
                // 401 if there is a point with that ID, but it's not the user's point
                return Unauthorized();
            }

            bool changed = false;

            if (editDto.LocationChange != null) {
                point.Location = _coordsDtoParser.ParseDto(editDto.LocationChange);
                changed = true;
            }

            if (editDto.HoursChange != null) {
                point.HoursList = editDto.HoursChange.Select(_slotDtoParser.ParseDto).ToList();
                changed = true;
            }

            if (editDto.AddressChange != null) {
                point.Address = editDto.AddressChange;
                changed = true;
            }

            if (changed && !await _pointsRepo.UpdatePoint(point)) {
                // 400 if an error occurs
                return BadRequest();
            }

            // 200 on success
            return Ok(_pointDtoBuilder.BuildDto(point));
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePoint(string id) {
            NeighbourUser? loggedInUser = await _userRepo.GetUserByClaims(User);

            if (loggedInUser == null) {
                // 401 if anonymous - can't edit points unless signed in
                return Unauthorized();
            }

            InternalDeliveryPoint? point = await _pointsRepo.GetPoint(id);
            if (point == null) {
                // 404 if there's no point with that ID
                return NotFound();
            } else if (point.User != loggedInUser) {
                // 401 if there is a point with that ID, but it's not the user's point
                return Unauthorized();
            }

            if (!await _pointsRepo.DeletePoint(point)) {
                // 400 if an error occurs
                return BadRequest();
            }

            // 204 on success
            return NoContent();
        }
    }
}
