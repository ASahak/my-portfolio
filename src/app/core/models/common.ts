interface Works {
    name: string;
    preparedDate: number;
    link: string;
    isPublic: boolean;
    linkURL: string;
}

interface WithLabel {
    id: string;
    name: string;
}

interface AsideBarLinks {
    fb: string;
    linkedin: string;
    github: string;
}

interface Home {
    title: string;
    subTitle: string;
}
interface AboutTitle {
    title: string;
    description: string;
    workingPlaceName: string;
    workingPlaceUrl: string;
}
interface AboutMe {
    email: string;
    phone: string;
}

interface SkillsTitle {
    title: string;
    description1: string;
    description2: string;
    description3: string;
}
interface SkillsList {
    list: Array<string>;
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
    Home,
    AboutMe,
    AboutTitle,
    SkillsTitle,
    SkillsList,
    AsideBarLinks,
};
