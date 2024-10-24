import { useState } from 'react';
import Transport from '../ui/transport'
import styles from './directions.module.scss'
import deminWebp from '/src/assets/demin.webp';
import deminWebp2x from '/src/assets/demin@2x.webp';
import deminJpg from '/src/assets/demin.jpg';
import deminJpg2x from '/src/assets/demin@2x.jpg';

export default function Directions() {
    const [tags, setTags] = useState('');

    const handleTagsChange = (event) => {
        const inputValue = event.target.value;
        const words = inputValue.split(' ');

        const formattedWords = words.map((word) => {
            if (word === '') {
                return '';
            }
            if (word.startsWith('#')) {
                return word;
            }
            return `#${word}`;
        });

        const formattedTags = formattedWords.join(' ');
        setTags(formattedTags);
    };

    const handleBlurInput = () => {
        setTags(prevTags => {
            const words = prevTags.split(' ');

            const filteredWords = words.filter(word => !/^#+$/.test(word));

            return filteredWords.join(' ');
        });
    }

    return (
        <section className={styles.directions}>
            <h2 className={styles["visually-hidden"]}>Информация о путешественнике и путевые предпочтения.</h2>
            <div className={styles.container}>
                <form className={styles.directions__wrapper} onSubmit={(evt) => evt.preventDefault()} id="directions">
                    <div className={styles.directions__profile}>
                        <div className={styles.directions__level}>
                            <span className={styles["directions__level-number"]}>80</span>
                            <span className={styles["directions__level-text"]}>level</span>
                        </div>
                        <div className={styles["directions__profile-photo"]}>
                            <picture>
                                <source type="image/webp" srcSet={`${deminWebp}, ${deminWebp2x} 2x`} />
                                <img src={deminJpg} srcSet={`${deminJpg2x} 2x`} width={220} height={237} alt="Фото профиля." />
                            </picture>
                        </div>
                    </div>
                    <button className={styles.directions__button} type="button">сменить фото</button>
                    <div className={styles["directions__tags-input-wrap"]}>
                        <textarea
                            className={styles["directions__tags-input"]}
                            name="tags"
                            id="tags"
                            placeholder="Коротко о себе в виде 5-8 хештэгов"
                            rows="2"
                            value={tags}
                            onChange={handleTagsChange}
                            onBlur={handleBlurInput}
                        />
                        <label className={styles["directions__tags-input-label"]} htmlFor="tags">ТЭГИ</label>
                    </div>
                    <div className={styles["directions__transport-wrap"]}>
                        <Transport />
                        <span className={styles["directions__transport-label"]}>транспорт</span>
                    </div>
                </form>
            </div>
        </section>
    )
}
