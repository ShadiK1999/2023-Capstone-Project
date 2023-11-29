namespace ApiSource.Controllers.Dto.Conversion {
    public interface IDtoParser<TRaw, TDto> {
        public TRaw ParseDto(TDto dto);
    }
}
