package br.com.prestadorDeServico.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.prestadorDeServico.entities.Contato;

public interface ContatoRepository extends JpaRepository<Contato, String>{
	
	@Query(nativeQuery = true, value = "select * from contato where fk_cnpj_prestador_servico = :fk_cnpj_prestador_servico")
	List<Contato> findByCnpj(String fk_cnpj_prestador_servico);

}
