interface Works {
    name: string;
    preparedDate: number;
    link: string;
    isPublic: boolean;
    linkUrl: string;
}

interface WithLabel {
    id: string;
    name: string;
}

interface Programms {
    name: string;
    isPublic: boolean;
    link: string;
    language: string;
    preparedDate: number;
    linkURL: string;
}

export {
    Programms,
    Works,
    WithLabel,
};
