

interface Iuser {
    id: number;
    name: string;
    email: string;
    hashedPassword?: string;
    address?: Array<string> | string | undefined;
}