namespace FlowerShop.Common.Enums
{
    public enum UserRoleEnum
    {
        Admin = 1,
        Customer = 2
    }

    public enum OrderStatusEnum
    {
        Pending = 1,
        Confirmed = 2,
        Shipping = 3,
        Delivered = 4,
        Cancelled = 5
    }

    public enum PaymentMethodEnum
    {
        COD = 1,
        Banking = 2
    }
}
