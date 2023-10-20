import instance from "./axiosInstance";

export const downloadExportFile = async (url) => {
    instance
      .get(url, { responseType: "blob" })
      .then((response) => {
        const urlD = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        const urlParts = url.split("/");
        const fileName = urlParts[urlParts.length - 1];
        link.href = urlD;
        link.setAttribute("download", `${fileName}.csv`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => {
        // toast.error(errorMessage(err.response.data.detail));
      });
};