import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create a new category', async () => {
    // Arrange
    const createCategoryDto = {
      name: 'Test Category',
      description: 'This is a test category',
    };

    // Act
    const createdCategory = await service.create(createCategoryDto);

    // Assert
    expect(createdCategory).toBeDefined();
    expect(createdCategory.name).toEqual(createCategoryDto.name);
    expect(createdCategory.description).toEqual(createCategoryDto.description);
  });

  it('should find all categories', async () => {
    // Act
    const categories = await service.findAll();

    // Assert
    expect(categories).toBeDefined();
    expect(categories).toBeInstanceOf(Array);
  });

  it('should find a category by id', async () => {
    // Arrange
    const createCategoryDto = {
      name: 'Test Category',
      description: 'This is a test category',
    };

    const createdCategory = await service.create(createCategoryDto);

    // Act
    const category = await service.findOne(createdCategory.id);

    // Assert
    expect(category).toBeDefined();
    expect(category.id).toEqual(createdCategory.id);
  });

  it('should update a category', async () => {
    // Arrange
    const createCategoryDto = {
      name: 'Test Category',
      description: 'This is a test category',
    };

    const createdCategory = await service.create(createCategoryDto);

    const updateCategoryDto = {
      name: 'Updated Category',
      description: 'This is an updated test category',
    };

    // Act
    const updatedCategory = await service.update(createdCategory.id, updateCategoryDto);

    // Assert
    expect(updatedCategory).toBeDefined();
    expect(updatedCategory.id).toEqual(createdCategory.id);
    expect(updatedCategory.name).toEqual(updateCategoryDto.name);
    expect(updatedCategory.description).toEqual(updateCategoryDto.description);
  });

  it('should remove a category', async () => {
    // Arrange
    const createCategoryDto = {
      name: 'Test Category',
      description: 'This is a test category',
    };

    const createdCategory = await service.create(createCategoryDto);

    // Act
    const removedCategory = await service.remove(createdCategory.id);

    // Assert
    expect(removedCategory).toBeDefined();
    expect(removedCategory.id).toEqual(createdCategory.id);
  });
});

