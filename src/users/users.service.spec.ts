import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User, UserRole } from './user.model';
import { UsersRepository } from './users.repository';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('UsersService', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
      expect(repository).toBeDefined();
    });
    it('should call usersRepository.create', async () => {
      const createSpy = jest.spyOn(repository, 'create');

      const user = { username: 'Vendor A', role: UserRole.CUSTOMER };

      await service.create(user);

      expect(createSpy).toHaveBeenCalledWith(user);
    });
    it('should return an array of users', async () => {
      const users: User[] = [
        { id: 1, username: 'Javad_1' },
        { id: 2, username: 'Javad_2' },
      ] as any;

      const findAllRepository = jest
        .spyOn(repository, 'findAll')
        .mockResolvedValue(users);

      const result = await service.findAll();

      expect(findAllRepository).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });
});
