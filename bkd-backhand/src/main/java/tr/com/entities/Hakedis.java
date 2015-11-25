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
import javax.validation.constraints.NotNull;

import org.joda.time.LocalDate;

/**
 * A Hakedis.
 */
@SuppressWarnings("serial")
@Entity
@Table(name = "hakedis")
public class Hakedis implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    
    @Column(name = "tarih")
    private LocalDate tarih;

    @NotNull
    @Column(name = "bas_tarih", nullable = false)
    private LocalDate basTarih;

    @NotNull
    @Column(name = "bit_tarih", nullable = false)
    private LocalDate bitTarih;
    
    @Column(name = "prim")
    private Double prim;

    @ManyToOne
    private Calisan calisan;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getTarih() {
        return tarih;
    }

    public void setTarih(LocalDate tarih) {
        this.tarih = tarih;
    }

    public LocalDate getBasTarih() {
        return basTarih;
    }

    public void setBasTarih(LocalDate basTarih) {
        this.basTarih = basTarih;
    }

    public LocalDate getBitTarih() {
        return bitTarih;
    }

    public void setBitTarih(LocalDate bitTarih) {
        this.bitTarih = bitTarih;
    }

    public Double getPrim() {
        return prim;
    }

    public void setPrim(Double prim) {
        this.prim = prim;
    }

    public Calisan getCalisan() {
        return calisan;
    }

    public void setCalisan(Calisan calisan) {
        this.calisan = calisan;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Hakedis hakedis = (Hakedis) o;

        if ( ! Objects.equals(id, hakedis.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Hakedis{" +
                "id=" + id +
                ", tarih='" + tarih + "'" +
                ", basTarih='" + basTarih + "'" +
                ", bitTarih='" + bitTarih + "'" +
                ", prim='" + prim + "'" +
                '}';
    }
}
