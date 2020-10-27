export class GenericResponse<T> {
    constructor(
        public data: T,
        public success: boolean,
        public message: string
    ) {}
}
