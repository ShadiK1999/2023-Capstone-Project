using ApiSource.Points.Filters;
using Swashbuckle.AspNetCore.Annotations;
using System.Text.Json.Serialization;

namespace ApiSource.Controllers.Dto.Filters {
    [JsonPolymorphic(TypeDiscriminatorPropertyName = "filterType")]
    [SwaggerDiscriminator("filterType")]
    [JsonDerivedType(typeof(LocationFilterDto), typeDiscriminator: "location")]
    [SwaggerSubType(typeof(LocationFilterDto), DiscriminatorValue = "location")]

    [JsonDerivedType(typeof(DaysFilterDto), typeDiscriminator: "day")]
    [SwaggerSubType(typeof(DaysFilterDto), DiscriminatorValue = "day")]

    [JsonDerivedType(typeof(HoursFilterDto), typeDiscriminator: "hours")]
    [SwaggerSubType(typeof(HoursFilterDto), DiscriminatorValue = "hours")]
    public abstract class PointFilterDto {
        public abstract IPointFilter AsFilter();
    }
}
