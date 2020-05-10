import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RepoService from './repo.service';
import Author from './db/models/author.entity';
import Book from './db/models/book.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Author, Book])],
  providers: [RepoService],
  exports: [RepoService],
})
class RepoModule {}
export default RepoModule;
