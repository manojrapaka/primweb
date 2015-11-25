package tr.com.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;

import org.joda.time.LocalDate;

/**
 * A Havuz.
 */
@Data
@Entity
@Table(name = "havuz")
public class Havuz implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "tarih")
    private LocalDate tarih;

    @Column(name = "bas_tarih")
    private LocalDate basTarih;

    @Column(name = "bit_tarih")
    private LocalDate bitTarih;

    @Column(name = "tutar")
    private Double tutar;
}
