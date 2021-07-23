import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[]{
        return this.movies;
    }

    getOne(id:string) :Movie{
        const movie = this.movies.find(movie => movie.id === parseInt(id));
        if(!movie){
            //NestJs에서 제공하는 exception
            throw new NotFoundException(`movie with id ${id} Not Found`);
        }
        return movie;
    }

    deleteOne(id: string){
        this.getOne(id)
        this.movies = this.movies.filter(movie=> movie.id !== +id);
    }

    create(movieData){
        return this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        })
    }

    update(id:string, updateData){
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push(movie, updateData);
    }
}
