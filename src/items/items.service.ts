import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {

  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>) {}
  create(createItemDto: CreateItemDto) {
    console.log('createItemDto', createItemDto);
    return this.itemRepository.save(createItemDto);'This action adds a new item';
  }

  findAll() {
    return this.itemRepository.find();
  }

  findOne(id: number) {
    return this.itemRepository.findOneBy({ id });
  }


  update(id: number, updateItemDto: UpdateItemDto) {
    // => { id, title, contectMobileNo }
    // update item set tile = '', con = '' where id = ?

    // const updateItem = {
    //   id: id,
    //   title: updateItemDto.title,
    //   contactMobileNo = updateItemDto.contactMobileNo
    //   status: updateItemDto.state
    // }  
    return this.itemRepository.save({
      id, ...updateItemDto
    })
  }

  remove(id: number) {
    // const where = { id: id}
    return this.itemRepository.delete({ id })               
  }
}
