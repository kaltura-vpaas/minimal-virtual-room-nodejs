var kaltura = require('kaltura-client');

function createMeetingRoom(topicName, done) {
  const config = new kaltura.Configuration();
  config.serviceUrl = process.env.KALTURA_SERVICE_URL;
  const client = new kaltura.Client(config);

  const apiSecret = process.env.KALTURA_ADMIN_SECRET
  const partnerId = process.env.KALTURA_PARTNER_ID
  const userId = process.env.KALTURA_USER_ID;

  const type = kaltura.enums.SessionType.ADMIN;

  // Generate Kaltura Session (KS)
  // *** https://developer.kaltura.com/console/service/session/action/start
  kaltura.services.session.start(
    apiSecret,
    userId,
    type,
    partnerId)
  .completion((success, ks) => {
    if (!success) {
      console.log("ERROR");
      throw new Error(ks.message);
    }
    client.setKs(ks);

    // Create the virtual room
    // *** https://developer.kaltura.com/console/service/scheduleResource/action/add
    let scheduleResource = new kaltura.objects.LocationScheduleResource();
    scheduleResource.name = topicName;
    scheduleResource.tags = "vcprovider:newrow"; // mandatory tag

    kaltura.services.scheduleResource.add(scheduleResource)
    .execute(client)
    .then(result => {
      console.log(result);
      done(result);
    });
  })
  .execute(client);
}

module.exports = createMeetingRoom