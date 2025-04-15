import { Test, TestingModule } from '@nestjs/testing';
import { AccountRepository } from '../repository/account.repository';
import { SignUpDto } from '../dtos/sign-up.dto';
import { SignUpMapper } from '../mappers/sign-up.mapper';
import { Account } from '../entities/account.entity';
import { CryptoServiceInterface } from '@my-task-timer/shared-interfaces';
import { SignUpUseCase } from './sign-up';
import {
  ConflictException,
  InternalServerError,
} from '@my-task-timer/shared-utils-errors';

describe('Sign Up', () => {
  let signUpUseCase: SignUpUseCase;
  let accountRepository: AccountRepository;
  let signUpMapper: SignUpMapper;
  let cryptoService: CryptoServiceInterface;

  beforeEach(async () => {
    const mockAccountRepository = {
      createOne: jest.fn(),
    };

    const mockCryptoService = {
      hashPassword: jest.fn(),
    };

    const mockSignUpMapper = {
      toEntity: jest.fn(),
      toResponse: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignUpUseCase,
        {
          provide: AccountRepository,
          useValue: mockAccountRepository,
        },
        {
          provide: 'CryptoServiceInterface',
          useValue: mockCryptoService,
        },
        {
          provide: SignUpMapper,
          useValue: mockSignUpMapper,
        },
      ],
    }).compile();

    signUpUseCase = module.get<SignUpUseCase>(SignUpUseCase);
    accountRepository = module.get<AccountRepository>(AccountRepository);
    cryptoService = module.get<CryptoServiceInterface>(
      'CryptoServiceInterface'
    );
    signUpMapper = module.get<SignUpMapper>(SignUpMapper);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(signUpUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should sign up a new user', async () => {
      const signUpDto: SignUpDto = {
        email: 'test@test.com',
        username: 'testuser',
        password: 'password123',
      };

      const hashedPassword = 'hashed-password-value';
      const accountEntity: Account = {
        ...signUpDto,
        password: hashedPassword,
        id: 'generated-id',
      };
      const expectedResult: SignUpDto = {
        ...signUpDto,
        id: 'generated-id',
        password: hashedPassword,
      };

      (cryptoService.hashPassword as jest.Mock).mockResolvedValue(
        hashedPassword
      );
      (signUpMapper.toEntity as jest.Mock).mockReturnValue(accountEntity);
      (accountRepository.createOne as jest.Mock).mockResolvedValue(
        accountEntity
      );
      (signUpMapper.toResponse as jest.Mock).mockReturnValue(expectedResult);

      const result = await signUpUseCase.execute(signUpDto);

      expect(cryptoService.hashPassword).toHaveBeenCalledWith(
        signUpDto.password
      );
      expect(signUpMapper.toEntity).toHaveBeenCalledWith({
        ...signUpDto,
        password: hashedPassword,
      });
      expect(accountRepository.createOne).toHaveBeenCalledWith(accountEntity);
      expect(signUpMapper.toResponse).toHaveBeenCalledWith(accountEntity);
      expect(result).toEqual(expectedResult);
    });

    it('should throw InternalServerError when password hashing fails', async () => {
      const signUpDto: SignUpDto = {
        email: 'test@test.com',
        username: 'testuser',
        password: 'password123',
      };

      (cryptoService.hashPassword as jest.Mock).mockRejectedValue(
        new Error('Hashing failed')
      );

      await expect(signUpUseCase.execute(signUpDto)).rejects.toThrow(
        new InternalServerError('Something went wrong trying to hash password')
      );

      expect(cryptoService.hashPassword).toHaveBeenCalledWith(
        signUpDto.password
      );
      expect(signUpMapper.toEntity).not.toHaveBeenCalled();
      expect(accountRepository.createOne).not.toHaveBeenCalled();
    });

    it('should throw InternalServerError when account creation fails', async () => {
      const signUpDto: SignUpDto = {
        email: 'test@test.com',
        username: 'testuser',
        password: 'password123',
      };

      const hashedPassword = 'hashed-password-value';
      const accountEntity: Account = {
        ...signUpDto,
        password: hashedPassword,
        id: 'generated-id',
      };

      (cryptoService.hashPassword as jest.Mock).mockResolvedValue(
        hashedPassword
      );
      (signUpMapper.toEntity as jest.Mock).mockReturnValue(accountEntity);
      (accountRepository.createOne as jest.Mock).mockRejectedValue(
        new Error('Database error')
      );

      await expect(signUpUseCase.execute(signUpDto)).rejects.toThrow(
        new InternalServerError(
          'Failed to create account: ACCOUNT_REPOSITORY_ERROR'
        )
      );

      expect(cryptoService.hashPassword).toHaveBeenCalledWith(
        signUpDto.password
      );
      expect(signUpMapper.toEntity).toHaveBeenCalled();
      expect(accountRepository.createOne).toHaveBeenCalledWith(accountEntity);
    });

    it('should throw ConflictException when email already exists', async () => {
      const signUpDto: SignUpDto = {
        email: 'test@test.com',
        username: 'testuser',
        password: 'password123',
      };

      const hashedPassword = 'hashed-password-value';
      const accountEntity: Account = {
        ...signUpDto,
        password: hashedPassword,
        id: 'generated-id',
      };
      const duplicateError = { code: '23505', message: 'Duplicate key value' };

      (cryptoService.hashPassword as jest.Mock).mockResolvedValue(
        hashedPassword
      );
      (signUpMapper.toEntity as jest.Mock).mockReturnValue(accountEntity);
      (accountRepository.createOne as jest.Mock).mockRejectedValue(
        duplicateError
      );

      await expect(signUpUseCase.execute(signUpDto)).rejects.toThrow(
        new ConflictException('Email already exists')
      );

      expect(cryptoService.hashPassword).toHaveBeenCalledWith(
        signUpDto.password
      );
      expect(signUpMapper.toEntity).toHaveBeenCalled();
      expect(accountRepository.createOne).toHaveBeenCalledWith(accountEntity);
    });
  });
});
