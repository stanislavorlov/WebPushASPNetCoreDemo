using Lib.Net.Http.WebPush;
using WebPushDemo.Models;

namespace WebPushDemo.Services
{
    public interface IPushNotificationService
    {
        Task SendNotification(PushSubscription subscription, string payload);
    }
}