abstract class IStorageService {
  abstract getCoverImageUrl(image: File): Promise<string | Error>;
}
export default IStorageService;
