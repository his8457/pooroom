declare global {
  interface Window {
    daum: {
      Postcode: new (options: PostcodeOptions) => PostcodeService;
    };
  }
}

interface PostcodeOptions {
  oncomplete: (data: PostcodeData) => void;
  width?: number | string;
  height?: number | string;
  animation?: boolean;
  focusInput?: boolean;
  autoMapping?: boolean;
}

interface PostcodeData {
  zonecode: string;        // 우편번호
  address: string;         // 주소 (지번)
  addressEnglish: string;  // 영문 주소
  roadAddress: string;     // 도로명 주소
  jibunAddress: string;    // 지번 주소
  autoRoadAddress: string; // 도로명 주소 (검색 결과)
  autoJibunAddress: string; // 지번 주소 (검색 결과)
  buildingCode: string;    // 건물 코드
  buildingName: string;    // 건물명
  apartment: 'Y' | 'N';    // 아파트 여부
  sido: string;            // 시/도
  sigungu: string;         // 시/군/구
  roadname: string;        // 도로명
  bcode: string;           // 법정동/법정리 코드
  roadnameCode: string;    // 도로명 코드
  userLanguageType: 'K' | 'E'; // 언어 타입
}

interface PostcodeService {
  open(): void;
  embed(element: HTMLElement): void;
}

export {};