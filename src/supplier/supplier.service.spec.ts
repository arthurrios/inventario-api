import { Test, TestingModule } from '@nestjs/testing';
import { SupplierService } from './supplier.service';

describe('SupplierService', () => {
  let service: SupplierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplierService],
    }).compile();

    service = module.get<SupplierService>(SupplierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new supplier', async () => {
    // Arrange
    const createSupplierDto = {
      name: 'Test Supplier',
      contact: '1234567890',
    };

    // Act
    const createdSupplier = await service.create(createSupplierDto);

    // Assert
    expect(createdSupplier).toBeDefined();
    expect(createdSupplier.name).toEqual(createSupplierDto.name);
    expect(createdSupplier.contact).toEqual(createSupplierDto.contact);
  });

  it('should find all suppliers', async () => {
    // Act
    const suppliers = await service.findAll();

    // Assert
    expect(suppliers).toBeDefined();
    expect(suppliers).toBeInstanceOf(Array);
  });

  it('should find a supplier by id', async () => {
    // Arrange
    const createSupplierDto = {
      name: 'Test Supplier',
      contact: '1234567890',
    };

    const createdSupplier = await service.create(createSupplierDto);

    // Act
    const supplier = await service.findOne(createdSupplier.id);

    // Assert
    expect(supplier).toBeDefined();
    expect(supplier.id).toEqual(createdSupplier.id);
  });

  it('should update a supplier', async () => {
    // Arrange
    const createSupplierDto = {
      name: 'Test Supplier',
      contact: '1234567890',
    };

    const createdSupplier = await service.create(createSupplierDto);

    const updateSupplierDto = {
      name: 'Updated Supplier',
      contact: '0987654321',
    };

    // Act
    const updatedSupplier = await service.update(createdSupplier.id, updateSupplierDto);

    // Assert
    expect(updatedSupplier).toBeDefined();
    expect(updatedSupplier.id).toEqual(createdSupplier.id);
    expect(updatedSupplier.name).toEqual(updateSupplierDto.name);
    expect(updatedSupplier.contact).toEqual(updateSupplierDto.contact);
  });

  it('should remove a supplier', async () => {
    // Arrange
    const createSupplierDto = {
      name: 'Test Supplier',
      contact: '1234567890',
    };

    const createdSupplier = await service.create(createSupplierDto);

    // Act
    const removedSupplier = await service.remove(createdSupplier.id);

    // Assert
    expect(removedSupplier).toBeDefined();
    expect(removedSupplier.id).toEqual(createdSupplier.id);
  });

  afterEach(async () => {
    await (service as any).prisma.$disconnect();
  });

  afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
  });


});
