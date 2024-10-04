export default interface INavItem {
    icon: string;
    name: string;
    href?: string;
    active?: boolean;
    onClick?: () => void;
}
