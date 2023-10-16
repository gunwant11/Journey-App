
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';


const GradientView = ({ style, children, isLoginPage }) => {

    const [gradientColors, setGradientColors] = useState(['#f0d9d3', '#d4d2df'])

    useEffect(() => {
        if (isLoginPage) {
            setGradientColors(['#f0d9d3', '#d3e7d8'])
        }
        else {
            setGradientColors(['#f0d9d3', '#d4d2df'])
        }
    }
        , [isLoginPage])

    return (
        <LinearGradient
            colors={gradientColors}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.7, y: 1 }}
        >
                {children}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
})

export default GradientView;
