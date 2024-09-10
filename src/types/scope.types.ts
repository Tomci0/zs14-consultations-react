export default interface IScope {
    _id: string;
    name: string;
    description: string;
    subject: string;
    type: {
        _id: string;
        name: string;
        test: boolean;
        shorttest: boolean;
        practise: boolean;
    };
}
