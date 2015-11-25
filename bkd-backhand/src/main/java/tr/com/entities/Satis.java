package tr.com.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.joda.time.LocalDate;

/**
 * A Satis.
 */
@SuppressWarnings("serial")
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

    @NotNull
    @Min(value = 0)        
    @Column(name = "tutar", nullable = false)
    private Double tutar;

    @ManyToOne
    private Calisan calisan;

    @ManyToOne
    private Ulke ulke;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFaturaNo() {
        return faturaNo;
    }

    public void setFaturaNo(String faturaNo) {
        this.faturaNo = faturaNo;
    }

    public LocalDate getTarih() {
        return tarih;
    }

    public void setTarih(LocalDate tarih) {
        this.tarih = tarih;
    }

    public Double getTutar() {
        return tutar;
    }

    public void setTutar(Double tutar) {
        this.tutar = tutar;
    }

    public Calisan getCalisan() {
        return calisan;
    }

    public void setCalisan(Calisan calisan) {
        this.calisan = calisan;
    }

    public Ulke getUlke() {
        return ulke;
    }

    public void setUlke(Ulke ulke) {
        this.ulke = ulke;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Satis satis = (Satis) o;

        if ( ! Objects.equals(id, satis.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Satis{" +
                "id=" + id +
                ", faturaNo='" + faturaNo + "'" +
                ", tarih='" + tarih + "'" +
                ", tutar='" + tutar + "'" +
                '}';
    }
}
