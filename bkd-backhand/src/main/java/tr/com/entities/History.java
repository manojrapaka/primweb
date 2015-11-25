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
 * A History.
 */
@Data
@Entity
@Table(name = "history")
public class History implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "kolon_adi")
    private String kolonAdi;

    @Column(name = "deger")
    private String deger;

    @Column(name = "tablo_adi")
    private String tabloAdi;

    @Column(name = "tarih")
    private LocalDate tarih;

    @Column(name = "rec_id")
    private Long recId;
}
