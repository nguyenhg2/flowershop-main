namespace FlowerShop.Common.Constants
{
    public static class AppConstants
    {
        public const string RoleAdmin = "Admin";
        public const string RoleCustomer = "Customer";

        public const string StatusPending = "pending";
        public const string StatusConfirmed = "confirmed";
        public const string StatusShipping = "processing";
        public const string StatusDelivered = "delivered";
        public const string StatusCancelled = "cancelled";

        public const string PaymentCOD = "cod";
        public const string PaymentBanking = "transfer";

        public const int PageSize = 12;
        public const int AdminPageSize = 20;

        public const string UploadFolder = "uploads";
        public const long MaxFileSize = 5 * 1024 * 1024;
    }
}
