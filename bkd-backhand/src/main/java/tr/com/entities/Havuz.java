package tr.com.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.joda.time.LocalDate;

/**
 * A Havuz.
 */
@SuppressWarnings("serial")
@Entity
@Table(name = "havuz")
public class Havuz implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    @NotNull
    @Column(name = "tarih", nullable = false)
    private LocalDate tarih;

    @NotNull
    @Column(name = "bas_tarih", nullable = false)
    private LocalDate basTarih;

    @NotNull
    @Column(name = "bit_tarih", nullable = false)
    private LocalDate bitTarih;
    
    @Column(name = "tutar")
    private Double tutar;

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

    public Double getTutar() {
        return tutar;
    }

    public void setTutar(Double tutar) {
        this.tutar = tutar;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Havuz havuz = (Havuz) o;

        if ( ! Objects.equals(id, havuz.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Havuz{" +
                "id=" + id +
                ", tarih='" + tarih + "'" +
                ", basTarih='" + basTarih + "'" +
                ", bitTarih='" + bitTarih + "'" +
                ", tutar='" + tutar + "'" +
                '}';
    }
}
