export interface ImageInterface {
    file_id: number;
    file_directory: string;
    file_size_name: string | null;
    original_file_id?: number;
    sizes?: ImageInterface[];
}