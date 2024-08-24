import { Test, TestingModule } from '@nestjs/testing';
import { SupplierService } from './supplier.service';
import { PrismaService } from '../prisma/prisma.service';

describe('SupplierService', () => {
  let service: SupplierService;
  let mockPrismaService: any;

  beforeEach(async () => {
    mockPrismaService = {
      supplier: {
        create: jest.fn().mockResolvedValue({
          id: 'some-uuid',  // Mocked ID, change as needed
          name: 'Test Supplier',
          contact: '1234567890',
        }),
        findMany: jest.fn().mockResolvedValue([
          { id: 'some-uuid', name: 'Test Supplier', contact: '1234567890' },
        ]),
        findUnique: jest.fn().mockImplementation(({ where }) => {
          if (where.id === 'some-uuid') {
            return Promise.resolve({
              id: 'some-uuid',
              name: 'Test Supplier',
              contact: '1234567890',
            });
          }
          return Promise.resolve(null);
        }),
        update: jest.fn().mockImplementation(({ where, data }) => {
          if (where.id === 'some-uuid') {
            return Promise.resolve({
              id: 'some-uuid',
              ...data,
            });
          }
          return Promise.resolve(null);
        }),
        delete: jest.fn().mockResolvedValue({
          id: 'some-uuid',
          name: 'Test Supplier',
          contact: '1234567890',
        }),
      },
      $disconnect: jest.fn(),  // Mock the $disconnect method
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupplierService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,  // Use the mock PrismaService here
        },
      ],
    }).compile();

    service = module.get<SupplierService>(SupplierService);
  });

  afterEach(() => {
    jest.clearAllMocks();
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
    expect(suppliers.length).toBeGreaterThan(0); // Ensure there's at least one supplier
  });

  it('should find a supplier by id', async () => {
    // Act
    const supplier = await service.findOne('some-uuid');

    // Assert
    expect(supplier).toBeDefined();
    expect(supplier.id).toEqual('some-uuid');
  });

  it('should update a supplier', async () => {
    // Arrange
    const updateSupplierDto = {
      name: 'Updated Supplier',
      contact: '0987654321',
    };

    // Act
    const updatedSupplier = await service.update('some-uuid', updateSupplierDto);

    // Assert
    expect(updatedSupplier).toBeDefined();
    expect(updatedSupplier.id).toEqual('some-uuid');
    expect(updatedSupplier.name).toEqual(updateSupplierDto.name);
    expect(updatedSupplier.contact).toEqual(updateSupplierDto.contact);
  });

  it('should remove a supplier', async () => {
    // Act
    const removedSupplier = await service.remove('some-uuid');

    // Assert
    expect(removedSupplier).toBeDefined();
    expect(removedSupplier.id).toEqual('some-uuid');
  });
});
