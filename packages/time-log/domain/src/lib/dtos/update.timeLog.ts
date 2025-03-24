import { Expose } from "class-transformer";
import { CreateTimeLogDto } from "./create.timeLog";
import { IsDateString, IsString } from "class-validator";

export class UpdateTimeLogDto extends CreateTimeLogDto {

    @Expose()
    @IsDateString(
        {}, { message: 'A data de fim do log de tempo é obrigatória.' })
    endedAt?: Date | null;

    @Expose()
    @IsString({ message: 'O id do log de tempo é obrigatório.' })
    id!: string;
}