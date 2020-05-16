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

export {
    Works,
    WithLabel,
};
