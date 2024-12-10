import random
import time

def contador():
    contando = True  # Inicializa el estado de conteo
    cuenta = 0       # Inicializa el contador
    print("")
    print("")
    print("Contando cabras... ")
    while contando:
        cuenta += 1
        print(f"{cuenta} {'🐐' * cuenta}...")  # Imprime el número seguido de 'cuenta' cantidad de 🐑o🐐
        time.sleep(1)

        # Calculando la probabilidad de continuar sin dormirse
        probabilidad = 0.9 ** cuenta  # Probabilidad de seguir contando sin dormirse

        # Probabilidad del 10% de terminar
        if random.random() < 0.1:  # random.random() devuelve un número entre 0 y 1
            print("¡Te has quedado dormido! 😴💤")
            time.sleep(0.5)
            print(f"Has conseguido contar hasta {cuenta} G.O.A.Ts 🐐🐐")
            time.sleep(1.5)
            print(f"Probabilidad: {probabilidad * 100:.2f}%.")
            contando = False  # Detiene el bucle
            break

# Llamada a la función
contador()
