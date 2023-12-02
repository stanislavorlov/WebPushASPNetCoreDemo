let pushServiceWorkerRegistration;

function registerPushServiceWorker() {
    navigator.serviceWorker.register('service-worker.js',
        { scope: 'service-worker/' })
        .then(function (serviceWorkerRegistration) {
            pushServiceWorkerRegistration = serviceWorkerRegistration;

            

            console.log('Push Service Worker has been registered successfully');
    }).catch (function (error) {
        console.log('Push Service Worker registration has failed: ' + error);
    });
};

function subscribeForPushNotifications() {
    let applicationServerPublicKey = urlBase64ToUint8Array(
        'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U',
    );

    pushServiceWorkerRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerPublicKey
    }).then(function (pushSubscription) {
        fetch('api/PushNotifications/subscriptions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pushSubscription)
        }).then(function (response) {
            if (response.ok) {
                console.log('Successfully subscribed for Push Notifications');
            } else {
                console.log('Failed to store the Push Notifications subscription on server');
            }
        }).catch(function (error) {
            console.log('Failed to store the Push Notifications subscription on server: ' + error);
        });


    }).catch (function (error) {
        if (Notification.permission === 'denied') {

    } else {
        console.log('Failed to subscribe for Push Notifications: ' + error);
    }
});
};

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}