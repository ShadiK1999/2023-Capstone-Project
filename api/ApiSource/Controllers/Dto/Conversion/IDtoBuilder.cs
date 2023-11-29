namespace ApiSource.Controllers.Dto.Conversion {
    public interface IDtoBuilder<TRaw, TDto> {
        public TDto BuildDto(TRaw raw);
    }
}
