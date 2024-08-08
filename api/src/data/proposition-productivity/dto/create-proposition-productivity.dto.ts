import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreatePropositionProductivityDto {
  @IsInt()
  ano: number;

  @IsString()
  parlamentarAutor: string;

  @IsOptional()
  @IsInt()
  mocao?: number;

  @IsOptional()
  @IsInt()
  projetoDecretoLegislativo?: number;

  @IsOptional()
  @IsInt()
  projetoEmendaLOM?: number;

  @IsOptional()
  @IsInt()
  projetoIndicacao?: number;

  @IsOptional()
  @IsInt()
  projetoLei?: number;

  @IsOptional()
  @IsInt()
  projetoLeiComplementar?: number;

  @IsOptional()
  @IsInt()
  projetoResolucao?: number;

  @IsOptional()
  @IsInt()
  requerimentoAdministrativo?: number;

  @IsOptional()
  @IsInt()
  requerimentoUrgenciaUrgentissima?: number;

  @IsOptional()
  @IsInt()
  requerimentoUtilidadePublica?: number;

  @IsOptional()
  @IsInt()
  requerimentoEspecial?: number;

  @IsOptional()
  @IsInt()
  veto?: number;

  @IsInt()
  total: number;

  @IsString()
  tipo: string;
}
