export interface Hall {
    id?: number;
    name: string;
    noOfRows: number;
    noOfColumns: number;
    imageUrl?: string;
    cinemaId?: number;
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
    //movies?: Movie[];
    //schedules?: Schedule[];
}

export interface Movie {
    id?: number;
    title: string;
    description: string;
    releaseDate: string;
    duration?: number;
    imageUrl?: string;
    language?: string;
    genres: string;
    director?: string;
    cast?: string;

}
