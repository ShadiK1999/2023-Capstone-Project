namespace ApiSource.Points.Filters {
    public interface IPointFilter {
        bool Matches(IDeliveryPoint point);
    }
}
