self.addEventListener('push', function(event) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/logo.png',  // Your app logo
      badge: '/logo.png'  // Your app badge
    };
  
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  });
  