enum Gender {
    male = 'male',
    female = 'female'
}

enum Status {
    active = 'active',
    inactive = 'inactive'
}

export interface User {
    id: number
    name: string
    email: string
    gender: Gender
    status: Status
}

export type UserDto = Omit<User, 'id' | 'status'>