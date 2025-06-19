import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Title from '../components/Title';
import SelectV from '../components/SelectV';
import Button from '../components/Button';
import DropdownWithRadios from '../components/Dropdown';
import MeuMenu from '../components/MeuMenu';

import { IoPersonCircleOutline } from 'react-icons/io5';
import {
  FormCardSchema,
  formatTelefone,
  formatCPF,
  formatRG,
  formatDate,
} from '../components/FormCad';

function VisitantesC({ imageUrl }) {
  const navigate = useNavigate();
  const handleClick = () => navigate('/Funciocondo');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    mode: 'all',
    resolver: zodResolver(FormCardSchema),
    defaultValues: {
      nome: '',
      cpf: '',
      rg: '',
      telefone: '',
      genero: '',
      id_unidade: '',
      dataEntrada: '',
      dataSaida: '',
      visitantes: '',
    },
  });

  const onSubmit = (data) => console.log('Dados enviados:', data);

  return (
    <div className="container teste">
      <aside className="other-side">
        <MeuMenu />
        <Title>Adicionar um novo Visitante:</Title>
        <div className="photo-circle">
          {imageUrl ? (
            <img src={imageUrl} alt="User" />
          ) : (
            <IoPersonCircleOutline size={550} color="#555" />
          )}
        </div>
      </aside>

      <main className="direita-side">
        <form className="putbu" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-container">
            <Title>Nome:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite o seu nome"
              {...register('nome')}
            />
            {errors.nome && <span style={{ color: 'red' }}>{errors.nome.message}</span>}
          </div>

          <div className="input-container">
            <Title>CPF:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite seu CPF"
              value={watch('cpf')}
              onChange={(e) =>
                setValue('cpf', formatCPF(e.target.value), { shouldValidate: true })
              }
            />
            {errors.cpf && <span style={{ color: 'red' }}>{errors.cpf.message}</span>}
          </div>

          <div className="input-container">
            <Title>RG:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite seu RG"
              value={watch('rg')}
              onChange={(e) =>
                setValue('rg', formatRG(e.target.value), { shouldValidate: true })
              }
            />
            {errors.rg && <span style={{ color: 'red' }}>{errors.rg.message}</span>}
          </div>

          <div className="input-container">
            <Title>Gênero:</Title>
            <DropdownWithRadios
              value={watch('genero')}
              onChange={(val) => setValue('genero', val, { shouldValidate: true })}
            />
            {errors.genero && <span style={{ color: 'red' }}>{errors.genero.message}</span>}
          </div>

          <div className="input-container">
            <Title>Telefone:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite seu Telefone"
              value={watch('telefone')}
              onChange={(e) =>
                setValue('telefone', formatTelefone(e.target.value), { shouldValidate: true })
              }
            />
            {errors.telefone && <span style={{ color: 'red' }}>{errors.telefone.message}</span>}
          </div>

          <div className="input-container">
            <Title>Id_Unidade:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite o id da unidade"
              {...register('id_unidade')}
            />
            {errors.id_unidade && (
              <span style={{ color: 'red' }}>{errors.id_unidade.message}</span>
            )}
          </div>

          <div className="input-container">
            <Title>Data de entrada:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="DD/MM/AAAA"
              value={watch('dataEntrada')}
              onChange={(e) =>
                setValue('dataEntrada', formatDate(e.target.value), { shouldValidate: true })
              }
            />
            {errors.dataEntrada && (
              <span style={{ color: 'red' }}>{errors.dataEntrada.message}</span>
            )}
          </div>

          <div className="input-container">
            <Title>Data de saída:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="DD/MM/AAAA"
              value={watch('dataSaida')}
              onChange={(e) =>
                setValue('dataSaida', formatDate(e.target.value), { shouldValidate: true })
              }
            />
            {errors.dataSaida && (
              <span style={{ color: 'red' }}>{errors.dataSaida.message}</span>
            )}
          </div>

          <div className="input-container">
            <Title>Visitantes:</Title>
            <SelectV
              value={watch('visitantes')}
              onChange={(val) => setValue('visitantes', val, { shouldValidate: true })}
            />
            {errors.visitantes && (
              <span style={{ color: 'red' }}>{errors.visitantes.message}</span>
            )}
          </div>

          <div className="contente-3"></div>
          <div className="contente-2">
          <div className="button-div">
            <Button type="button" text="VOLTAR" onClick={handleClick} />
            <Button type="submit" text="ENVIAR" />
          </div>
              </div>

        </form>
      </main>
    </div>
  );
}

export default VisitantesC;
