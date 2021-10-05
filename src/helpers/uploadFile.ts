import B2 from "backblaze-b2";
import Envs from "../env";

const b2 = new B2({
  applicationKeyId: Envs.B2_APP_KEY_ID,
  applicationKey: Envs.B2_APP_KEY,
});

export const uploadCard = async (
  file: Buffer,
  details: number,
  fileName: string,
): Promise<void> => {
  await b2.authorize();
  const uploadurl = await b2.getUploadUrl({
    bucketId: "",
  });
  const dataBuffer = Buffer.from(file);

  await b2
    .uploadFile({
      uploadUrl: uploadurl.data.uploadUrl,
      uploadAuthToken: uploadurl.data.authorizationToken,
      fileName: `${details}/${fileName}.png`,
      data: dataBuffer,
    })
    .catch((err) => console.log(err));
};
