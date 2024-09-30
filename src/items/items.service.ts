import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Item, ItemStatus } from './entities/item.entity';

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

  async remove(id: number) {
    const item = await this.itemRepository.findOneBy({ id })
    if (!item) {
      throw new NotFoundException(`Not found: id=${id}`)
    }

    return this.itemRepository.delete({ id })
  }

  async approve(id: number) {
    // id should not empty
    if (!id) {
      throw new NotFoundException(`id should not empty`)
    }

    // item should found
    const item = await this.itemRepository.findOneBy({ id })
    if (!item) {
      throw new NotFoundException(`not found: id={}`)
    }

    // prepare items
    // const approveItem = {...item, status: ItemStatus.APPROVED}
    // return await this.itemRepository.save(approveItem)
    item.status = ItemStatus.APPROVED;
    return this.itemRepository.save(item);
  }  
}
