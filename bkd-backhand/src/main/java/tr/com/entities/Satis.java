package tr.com.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Data;

import org.joda.time.LocalDate;

/**
 * A Satis.
 */
@Data
@Entity
@Table(name = "satis")
public class Satis implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "fatura_no")
    private String faturaNo;

    @Column(name = "tarih")
    private LocalDate tarih;

    @Column(name = "tutar")
    private Double tutar;

    @ManyToOne
    private Calisan calisan;

    @ManyToOne
    private Ulke ulke;

}
