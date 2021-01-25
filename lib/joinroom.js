var kaltura = require('kaltura-client');

function joinMeetingRoom(resourceId,firstName,lastName,email,done) {
  const config = new kaltura.Configuration();
  config.serviceUrl = process.env.KALTURA_SERVICE_URL;
  const apiSecret = process.env.KALTURA_ADMIN_SECRET;
  const partnerId = process.env.KALTURA_PARTNER_ID;
  const expiry = 86400;
  const type = kaltura.enums.SessionType.USER;
  const client = new kaltura.Client(config);

  // Set priveleges parameter for Kaltura Session (KS) generation.
  // For userContextual role:
  //   0 = admin
  //   3 = guest
  // Mandatory fields: role, userContextualRole, resourceId (or eventId)
  let userContextualRole = "0";
  let privileges = "role:viewerRole,userContextualRole:" + userContextualRole + 
  ",resourceId:" + resourceId + ",firstName:" + firstName + ",lastName:"+lastName+",email:" + email;

  // Generate KS
  kaltura.services.session.start(
    apiSecret,
    email, // this is the user ID which uniquely identifies the user
    type,
    partnerId,
    expiry,
    privileges)
    .execute(client)
    .then(result => {
      // Pass the generated url back to caller in order for it to be rendered
      let roomUrl = "https://" + partnerId + ".kaf.kaltura.com/virtualEvent/launch?ks=" + result;
      console.log("JOIN URL: "+ roomUrl);
     done(roomUrl);
    });
}

module.exports = joinMeetingRoom