using Lib.Net.Http.WebPush;
using Lib.Net.Http.WebPush.Authentication;

namespace WebPushDemo.Services
{
    public class WebPushPushNotificationService : IPushNotificationService
    {
        private readonly PushServiceClient _pushClient;

        public WebPushPushNotificationService()
        {
            _pushClient = new PushServiceClient();
        }

        public async Task SendNotification(PushSubscription subscription, string payload)
        {
            var pushMessage = new PushMessage(payload);
            await _pushClient.RequestPushMessageDeliveryAsync(
                subscription,
                pushMessage,
                _pushClient.DefaultAuthentication,
                VapidAuthenticationScheme.WebPush);
        }
    }
}
