import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

    constructor(readonly movieService: MoviesService){

    }

    @Get()
    getAll() : Movie[]{
        return this.movieService.getAll();
        // return "This will return all movies";
    }

    @Get('/:id')
    getOne(@Param("id") movieId: number){
		//무언가가 필요하면 요청해야 함
        return this.movieService.getOne(movieId);
        // return `This will return one movie with the id : ${movieId}`;
    }

    @Post()
    create(@Body() movieData : CreateMovieDto){
        return this.movieService.create(movieData);
        // console.log(movieData);
        // return movieData;
        // return 'This will create a movie';
    }

    @Delete("/:id")
    remove(@Param('id') movieId: number){
        return this.movieService.deleteOne(movieId);
        // return `This will delete a movie with the id: ${movieId}`;
    }

    //리소스 일부를 지정해서 업데이트 하고 싶을 때 patch, 모든 리소스를 업데이트 할 때는 put
    // @Patch('/:id')
    // patch(@Param('id') movieId:string){
    //     return `This will patch a movie with the id: ${movieId}`;
    // }

    @Patch('/:id')
    patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto){
	    return this.movieService.update(movieId, updateData);
        // return {
        //     updatedMovie : movieId,
        //     ...updateData //object 그대로
        // }
    }

}   

