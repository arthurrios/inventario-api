import { Test, TestingModule } from '@nestjs/testing';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('SupplierController', () => {
  let controller: SupplierController;
  let service: SupplierService;

  beforeEach(async () => {
    const mockSupplierService = {
      create: jest.fn().mockResolvedValue({
        id: 'some-uuid',
        name: 'Test Supplier',
        contact: '1234567890',
      }),
      findAll: jest.fn().mockResolvedValue([
        { id: 'some-uuid', name: 'Test Supplier', contact: '1234567890' },
      ]),
      findOne: jest.fn().mockImplementation((id: string) => {
        if (id === 'some-uuid') {
          return Promise.resolve({
            id: 'some-uuid',
            name: 'Test Supplier',
            contact: '1234567890',
          });
        }
        return Promise.resolve(null);
      }),
      update: jest.fn().mockImplementation((id: string, updateSupplierDto) => {
        if (id === 'some-uuid') {
          return Promise.resolve({
            id: 'some-uuid',
            ...updateSupplierDto,
          });
        }
        return Promise.resolve(null);
      }),
      remove: jest.fn().mockResolvedValue({
        id: 'some-uuid',
        name: 'Test Supplier',
        contact: '1234567890',
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierController],
      providers: [
        {
          provide: SupplierService,
          useValue: mockSupplierService,
        },
      ],
    }).compile();

    controller = module.get<SupplierController>(SupplierController);
    service = module.get<SupplierService>(SupplierService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new supplier', async () => {
    const createSupplierDto = { name: 'Test Supplier', contact: '1234567890' };
    const result = await controller.create(createSupplierDto);

    expect(result).toBeDefined();
    expect(result.name).toEqual(createSupplierDto.name);
    expect(result.contact).toEqual(createSupplierDto.contact);
    expect(service.create).toHaveBeenCalledWith(createSupplierDto);
  });

  it('should return all suppliers', async () => {
    const result = await controller.findAll();

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a supplier by id', async () => {
    const id = 'some-uuid';
    const result = await controller.findOne(id);

    expect(result).toBeDefined();
    expect(result.id).toEqual(id);
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should return 404 if supplier not found', async () => {
    const id = 'non-existent-id';
    service.findOne = jest.fn().mockResolvedValue(null);

    try {
      await controller.findOne(id);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toEqual(`Supplier with id ${id} not found`);
    }
  });

  it('should update a supplier', async () => {
    const id = 'some-uuid';
    const updateSupplierDto = { name: 'Updated Supplier', contact: '0987654321' };
    const result = await controller.update(id, updateSupplierDto);

    expect(result).toBeDefined();
    expect(result.id).toEqual(id);
    expect(result.name).toEqual(updateSupplierDto.name);
    expect(result.contact).toEqual(updateSupplierDto.contact);
    expect(service.update).toHaveBeenCalledWith(id, updateSupplierDto);
  });

  it('should delete a supplier', async () => {
    const id = 'some-uuid';
    const result = await controller.remove(id);

    expect(result).toBeDefined();
    expect(result.id).toEqual(id);
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});
