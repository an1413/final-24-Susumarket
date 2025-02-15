import { customAxios } from "../library/customAxios";

// 이미지 업로드 API 이미지 이름을 리턴
export const imgUploadAPI = async (formData) => {
  try {
    const imgUrlRes = await customAxios.post("image/uploadfile", formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
    const imgURLResult = imgUrlRes.data;
    return imgURLResult.filename;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 다중 이미지 업로드 API 여러 이미지 이름 합쳐서 리턴
export const mutiImgUploadAPI = async (formData) => {
  try {
    const response = await customAxios.post("image/uploadfiles", formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });

    // 업로드된 이미지 파일의 URL을 추출하여 배열에 저장
    const imageURLs = response.data.map(
      (imgData) => `${process.env.REACT_APP_BASE_URL}/${imgData.filename}`,
    );

    return imageURLs.join(","); // 쉼표로 구분된 문자열로 변환하여 반환
  } catch (error) {
    console.log(error);
    throw error;
  }
};
