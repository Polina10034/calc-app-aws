import HttpService from "./httpService";
// import { UserService } from "./userService";

export const fileService = {
  uploadFiles,
  getHello,
  getPricingRsults,
};
// POST request: presigned URL
  async function uploadFiles(files, allFiles, accountId) {
    console.log("files", files);
    var totalFiles = files.length;
    if (!files || files.length === 0) {
      return "No data was provided";
    }
  
    const body = {
      files: files.map((file) => ({"name": file.name})),
      key: `u_${accountId}`,
      accountId: `account_id=${accountId}`
    };
    console.log(body)
    try {
      const response = await HttpService.post("/gets3url", body)
      console.log("Fetched presigned S3 URL:", response);
  
      await Promise.all(
        allFiles.map(async (file, i) => {
          const uploadResponse = await fetch(response.presigned_url[i], {
            method: "PUT",
            body: file,
          });
          console.log("uploadResponse", uploadResponse)
          if (!uploadResponse.ok) {
            console.error(`File ${i} upload failed with status code: ${uploadResponse.status}`);
          }
        })
      );
  
      alert(`Uploaded ${totalFiles} file(s) successfully.`);
      return ('ok');
    } catch (error) {
      console.error("Error uploading files:", error);
      return error;
    }
  }

  function getPricingRsults(account_id) {
    return HttpService.get(`/getpricingresults?id=${account_id}`).then((res) => {
      console.log(res);
    });
  }
  

function getHello() {
  return HttpService.get(`/hello`).then((res) => {
    console.log(res);
  });
  // if (UserService.isLoggedIn()) {
  //   return HttpService.get(`/claim?id=${id}`).then((res) => {
  //     return res.data;
  //   });
  // } 
  // else {
  //   return HttpService.get(`/signin`).then((res) => {
  //     return res;
  //   });
  // }
}
