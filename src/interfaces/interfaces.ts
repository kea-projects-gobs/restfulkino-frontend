export interface Hall {
    id?: number;
    name: string;
    noOfRows: number;
    noOfColumns: number;
    imageUrl?: string;
    cinemaId?: number;
    // schedule?: Schedule[];
}


export interface Cinema {
    id?: number;
    name: string;
    city: string;
    street: string;
    description?: string;
    phone?: string;
    email?: string;
    imageUrl?: string;
    halls?: Hall[];
}

export interface Movie {
    id?: number;
    title: string;
    description: string;
    releaseDate: string;
    duration?: number;
    imageUrl?: string;
    language?: string;
    genre: string;
    director?: string;
    cast?: string;
    // schedule?: Schedule[];
}

export interface Schedule {
    id?: number;
    startTime: string;
    endTime?: string;
    date: string;
    movieTitle: string;
    hallName: string;
    cinemaName: string;
    is3d: boolean;
    isLongMovie?: boolean;
  }


export interface UserData {
    email: string;
    username: string;
    password: string;
  }
