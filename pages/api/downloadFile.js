import instance from "./axiosInstance";

export const downloadFile = async (url,filename) =>{
    instance.get(url, { responseType: "blob" })
                    .then((response) => {
                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement("a");
                        link.href = url;
                        link.setAttribute("download",filename);
                        document.body.appendChild(link);
                        link.click();
                    })
                    .catch((err) => {
                        // toast.error(errorMessage(err.response.data.detail));
                    });
  };